import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import QB, { QBSession } from 'quickblox'

import {
  findUserById,
  qbDeleteUser,
  qbChatConnect,
  qbChatSendSystemMessage,
  qbDeleteRecords,
} from '@/services/quickblox'
import { QBUserId } from '@/models'
import { CLOSE_SESSION_NOTIFICATION } from '@/constants/notificationTypes'
import { userHasTag } from '@/utils/user'

export const deleteSchema = {
  tags: ['Users'],
  summary: 'Delete user by id',
  params: Type.Object({
    id: QBUserId,
  }),
  response: {
    204: Type.Null({ description: 'No content' }),
  },
  security: [{ apiKey: [] }] as Security,
}

const deleteById: FastifyPluginAsyncTypebox = async (fastify) => {
  const handleResponse = async (session: QBSession, userId: number) => {
    await qbChatConnect(session.user_id, session.token)
    const dialogId = QB.chat.helpers.getUserJid(userId)

    await qbChatSendSystemMessage(dialogId, {
      extension: {
        notification_type: CLOSE_SESSION_NOTIFICATION,
      },
    })

    return undefined
  }

  fastify.delete(
    '',
    {
      schema: deleteSchema,
      preHandler: (request, reply, done) => {
        handleResponse(request.session!, request.params.id)
          .then(done)
          .catch(done)
      },
      onRequest: fastify.verify(fastify.BearerToken),
    },
    async (request, reply) => {
      const { id } = request.params
      const user = await findUserById(id)
      if (userHasTag(user!, 'provider')) {
        await qbDeleteRecords('Appointment', {
          provider_id: id.toString(),
        })
      }
      await qbDeleteRecords('Appointment', { client_id: id })
      await qbDeleteUser(id)
      reply.code(204)

      return null
    },
  )
}

export default deleteById
