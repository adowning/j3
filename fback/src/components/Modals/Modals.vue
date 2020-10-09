<template>
  <div>
    <Modal
      v-if="isWorkorderCreateOpen"
      @close="isWorkorderCreateOpen = false"
      :width="700"
      :component="WorkorderCreate"
    />
    <Modal
      v-if="isWorkorderSearchOpen"
      @close="isWorkorderSearchOpen = false"
      variant="aside"
      :width="600"
      :component="WorkorderSearch"
    />

    <Modal
      v-if="isWorkorderDetailsOpen"
      @close="isWorkorderDetailsOpen = false"
      :width="1040"
      :component="WorkorderDetails"
      :componentProps="{ workorderId }"
    />
    <Modal
      v-if="isWorkorderDeleteOpen"
      @confirm="confirmWorkorderDelete"
      @close="isWorkorderDeleteOpen = false"
      :width="600"
      :component="Confirm"
      :componentProps="workorderDeleteProps"
    />

    <Modal
      v-if="isCommentDeleteOpen"
      @confirm="confirmCommentDelete"
      @close="isCommentDeleteOpen = false"
      :width="600"
      :component="Confirm"
      :componentProps="commentDeleteProps"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref } from '@vue/composition-api'
import WorkorderCreate from '@/components/Project/Workorder/WorkorderCreate/WorkorderCreate.vue'
import WorkorderSearch from '@/components/Project/Workorder/WorkorderSearch/WorkorderSearch.vue'
import WorkorderDetails from '@/components/Project/Workorder/WorkorderDetails/WorkorderDetails.vue'
import Confirm from './Confirm.vue'
import Modal from './Modal.vue'
import eventBus from '@/utils/eventBus'
export default defineComponent({
  components: {
    Modal
  },
  setup() {
    const isWorkorderCreateOpen = ref<boolean>(false)
    const isWorkorderSearchOpen = ref<boolean>(false)
    const isWorkorderDetailsOpen = ref<boolean>(false)
    const isWorkorderDeleteOpen = ref<boolean>(false)
    const isCommentDeleteOpen = ref<boolean>(false)
    const workorderId = ref<string>(false)
    const commentId = ref<string>(false)

    eventBus.$on(
      'toggle-workorder-details',
      (isOpen: boolean, id: string | number) => {
        if (isOpen) {
          workorderId.value = `${id}`
        }
        isWorkorderDetailsOpen.value = isOpen
      }
    )
    eventBus.$on('toggle-workorder-search', (isOpen: boolean) => {
      isWorkorderSearchOpen.value = isOpen
    })
    eventBus.$on('toggle-workorder-create', (isOpen: boolean) => {
      isWorkorderCreateOpen.value = isOpen
    })
    eventBus.$on('toggle-workorder-delete', (isOpen: boolean) => {
      isWorkorderDeleteOpen.value = isOpen
    })
    eventBus.$on(
      'toggle-comment-delete',
      (isOpen: boolean, id: string | number) => {
        if (isOpen) {
          commentId.value = `${id}`
        }
        isCommentDeleteOpen.value = isOpen
      }
    )

    const workorderDeleteProps = {
      title: 'Are you sure you want to delete this workorder?',
      message: "Once you delete, it's gone for good.",
      confirmText: 'Delete workorder',
      variant: 'primary'
    }
    const commentDeleteProps = {
      title: 'Are you sure you want to delete this comment?',
      message: "Once you delete, it's gone for good.",
      confirmText: 'Delete comment',
      variant: 'primary'
    }

    const confirmWorkorderDelete = () => {
      eventBus.$emit('confirm-workorder-delete')
    }
    const confirmCommentDelete = () => {
      eventBus.$emit('confirm-comment-delete', commentId.value)
    }

    return {
      WorkorderCreate,
      WorkorderDetails,
      WorkorderSearch,
      Confirm,
      isWorkorderCreateOpen,
      isWorkorderSearchOpen,
      isWorkorderDetailsOpen,
      isWorkorderDeleteOpen,
      isCommentDeleteOpen,
      workorderDeleteProps,
      commentDeleteProps,
      confirmWorkorderDelete,
      confirmCommentDelete,
      workorderId
    }
  }
})
</script>
