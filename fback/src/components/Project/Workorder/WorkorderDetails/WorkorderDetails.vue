<template>
  <WorkorderLoader v-if="!workorderCopy" />
  <div class="w-full h-full" v-else>
    <div class="flex items-center px-3 pt-4 text-textDarkest">
      <!-- Type -->
      <WorkorderType
        :updateWorkorder="handleUpdateWorkorder"
        :workorderId="workorderCopy.id"
        :value="workorderCopy.type"
      />
      <div class="flex-auto"></div>
      <j-button icon="feedback" variant="empty">Give Feedback</j-button>
      <j-button @click="copyWorkorderLink" icon="link" variant="empty"
        >Copy Link</j-button
      >
      <j-button @click="triggerWorkorderDelete" icon="trash" variant="empty" />
      <j-button
        v-if="withFullScreenButton"
        @click="goFullScreen"
        icon="expand"
        :iconSize="24"
        variant="empty"
      />
      <j-button
        v-if="withCloseButton"
        @click="$emit('close')"
        icon="times"
        :iconSize="24"
        variant="empty"
      />
    </div>
    <div class="flex w-full flex-wrap pb-16 px-7">
      <!-- LEFT SECTION -->
      <div class="sm:w-full md:w-7/12 lg:w-4/6 pr-10">
        <!-- Title -->
        <WorkorderTitle
          :updateWorkorder="handleUpdateWorkorder"
          :value="workorderCopy.title"
        />
        <!-- Description -->
        <WorkorderDescription
          :updateWorkorder="handleUpdateWorkorder"
          :initialValue="workorderCopy.description"
        />
        <!-- Comments -->
        <div class="pt-10">
          <div class="font-medium text-15">Comments</div>
          <Comment
            :refetchWorkorder="refetchWorkorder"
            isCreate
            :comment="{
              user: currentUser,
              body: 'Add a comment...',
              workorderId
            }"
          />
          <Comment
            @delete="triggeCommentDelete"
            :refetchWorkorder="refetchWorkorder"
            :comment="comment"
            v-for="comment in commentsSorted"
            :key="comment.id"
          />
        </div>
      </div>
      <!-- RIGHT SECTION -->
      <div class="sm:w-full md:w-5/12 lg:w-2/6 pt-1">
        <!-- STATUS -->
        <WorkorderStatus
          :updateWorkorder="handleUpdateWorkorder"
          :value="workorderCopy.status"
        />
        <!-- AssigneesReporter -->
        <WorkorderAssigneesReporter
          :reporterId="workorderCopy.reporterId"
          :userIds="workorderCopy.userIds"
          :updateWorkorder="handleUpdateWorkorder"
        />
        <!-- PRIORITY -->
        <WorkorderPriority
          :value="workorderCopy.priority"
          :updateWorkorder="handleUpdateWorkorder"
        />
        <!-- DATES -->
        <div
          class="mt-3 pt-3 leading-loose border-t border-borderLightest text-textMedium text-13"
        >
          <div>
            Created -
            {{ formatDateTimeConversational(workorderCopy.createdAt) }}
          </div>
          <div>
            Updated -
            {{ formatDateTimeConversational(workorderCopy.updatedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineComponent,
  ref,
  computed,
  onUnmounted
} from '@vue/composition-api'
import { useClipboard } from '@/hooks/useClipboard'
import { Workorder } from '@/types/workorder'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  getWorkorderWithUsersAndComments,
  deleteWorkorder,
  getProjectWorkorders,
  updateWorkorderMutation
} from '@/graphql/queries/workorder'
import WorkorderLoader from '@/components/Project/WorkorderLoader.vue'
import Comment from './Comment.vue'
import WorkorderDescription from './Description.vue'
import WorkorderTitle from './Title.vue'
import WorkorderType from './Type.vue'
import WorkorderStatus from './Status.vue'
import WorkorderAssigneesReporter from './AssigneesReporter.vue'
import WorkorderPriority from './Priority.vue'
import { formatDateTimeConversational } from '@/utils/date'
import { getters, mutations } from '@/store'
import eventBus from '@/utils/eventBus'
import { deleteComment } from '@/graphql/queries/comment'
import { updateArrayItemById } from '../../../../utils/dnd'

const sortByNewest = (items: any[] = [], sortField: string) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]))

export default defineComponent({
  components: {
    WorkorderLoader,
    Comment,
    WorkorderDescription,
    WorkorderTitle,
    WorkorderType,
    WorkorderStatus,
    WorkorderAssigneesReporter,
    WorkorderPriority
  },
  props: {
    workorderId: {
      type: [String, Number],
      required: true
    },
    withCloseButton: {
      type: Boolean,
      default: true
    },
    withFullScreenButton: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { root, emit }) {
    const workorderCopy = ref<Workorder>(null)
    const project = computed(getters.project)
    const currentUser = computed(getters.currentUser)

    const { onResult, loading, refetch: refetchWorkorder } = useQuery<{
      getWorkorderWithUsersAndComments: Workorder
    }>(getWorkorderWithUsersAndComments, {
      id: Number(props.workorderId)
    })

    onResult(res => {
      if (res && res.data && !res.loading) {
        workorderCopy.value = res.data.getWorkorderWithUsersAndComments
      }
    })

    const commentsSorted = computed(() => {
      if (!workorderCopy.value) {
        return []
      }
      return sortByNewest(workorderCopy.value.comments, 'createdAt')
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setClipboard] = useClipboard()

    const copyWorkorderLink = async () => {
      const path =
        window.location.origin +
        root.$router.resolve({
          name: 'workorder',
          params: { workorderId: `${props.workorderId}` }
        }).href

      await setClipboard(path)
    }

    const goFullScreen = () => {
      root.$router.push({
        name: 'workorder',
        params: { workorderId: `${props.workorderId}` }
      })
      emit('close')
    }

    const { mutate: mutateWorkorder } = useMutation<{
      updateWorkorder: Workorder
    }>(updateWorkorderMutation)

    const handleUpdateWorkorder = async (fields: Partial<Workorder>) => {
      workorderCopy.value = { ...workorderCopy.value, ...fields } as Workorder

      mutations.setProject({
        ...project.value,
        workorders: updateArrayItemById(
          project.value.workorders,
          props.workorderId as string,
          fields
        )
      })
      await mutateWorkorder({
        workorderId: Number(props.workorderId),
        workorder: { ...fields }
      } as any)
      await refetchWorkorder()
    }

    const { mutate } = useMutation<{ deleteWorkorder: boolean }>(
      deleteWorkorder
    )
    const { refetch: fetchProjectWorkorders } = useQuery<{
      getProjectWorkorders: Workorder[]
    }>(getProjectWorkorders)

    /* -------- Delete Workorder -------- */

    const isDeleteConfirmOpen = ref<boolean>(false)
    const triggerWorkorderDelete = () => {
      eventBus.$emit('toggle-workorder-delete', true, props.workorderId)
    }

    const deleteWorkorderHandler = async () => {
      await mutate({ workorderId: Number(props.workorderId) } as any)
      const res = await fetchProjectWorkorders()
      if (res.data) {
        mutations.setProject({
          ...project.value,
          workorders: res.data.getProjectWorkorders
        })
      }
      eventBus.$emit('toggle-workorder-delete', false)
      eventBus.$emit('toggle-workorder-details', false)
      eventBus.$emit('toggle-workorder-search', false)
      if (root.$route.name != 'board') {
        root.$router.replace({ name: 'board' })
      }
    }

    /* -------- Delete Comment -------- */

    const { mutate: deleteMutation } = useMutation(deleteComment)

    const triggeCommentDelete = (id: string | number) => {
      eventBus.$emit('toggle-comment-delete', true, id)
    }

    const deleteCommentHandler = async (id: string | number) => {
      await deleteMutation({ commentId: `${id}` } as any)
      await refetchWorkorder()
      eventBus.$emit('toggle-comment-delete', false)
    }

    eventBus.$on('confirm-workorder-delete', deleteWorkorderHandler)

    eventBus.$on('confirm-comment-delete', deleteCommentHandler)

    onUnmounted(() => {
      eventBus.$off('confirm-workorder-delete', deleteWorkorderHandler)
      eventBus.$off('confirm-comment-delete', deleteCommentHandler)
    })

    return {
      currentUser,
      project,
      loading,
      refetchWorkorder,
      WorkorderStatus,
      workorderCopy,
      handleUpdateWorkorder,
      copyWorkorderLink,
      goFullScreen,
      triggerWorkorderDelete,
      triggeCommentDelete,
      commentsSorted,
      isDeleteConfirmOpen,
      formatDateTimeConversational
    }
  }
})
</script>

<style lang="postcss" scoped>
.formField {
  @apply mt-5;
}
.sep {
  @apply mt-5 border border-backgroundLightest;
}
.formFieldLabel {
  @apply block pb-1-25 text-textMedium text-13 font-medium;
}
.formFieldTip {
  @apply pt-1-5 text-textMedium text-13;
}
</style>

<style lang="scss" scoped>
.error {
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 10px;
  background: #f53b57;
  color: white;
  font-size: 12px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 3px;
}
</style>
