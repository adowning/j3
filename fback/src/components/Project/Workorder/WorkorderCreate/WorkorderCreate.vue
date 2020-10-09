<template>
  <div class="w-full h-full py-5 px-8">
    <div class="flex items-center py-3 text-textDarkest">
      <div class="text-xl">
        Create workorder
      </div>
      <div class="flex-auto"></div>
      <j-button
        @click="$emit('close')"
        icon="x"
        :iconSize="24"
        variant="empty"
      />
    </div>
    <form novalidate autocomplete="off">
      <div class="formField">
        <label for="workordertype" class="formFieldLabel">Workorder type</label>
        <j-select
          id="workordertype"
          :value="workorderCreateObject.type"
          searchable
          :options="
            Object.values(WorkorderType).map(type => ({
              value: type,
              label: WorkorderTypeCopy[type],
              icon: WorkorderTypeCopy[type].toLowerCase()
            }))
          "
          @change="setFieldValue('type', $event)"
          customRender
        >
          <template v-slot:default="{ label, icon }">
            <div class="my-px mr-4 flex items-center">
              <j-icon class="mr-1" :size="16" :name="icon"></j-icon>
              <div class="pr-1 pl-2">
                {{ label }}
              </div>
            </div>
          </template>
        </j-select>
        <div class="formFieldTip">
          Start typing to get a list of possible matches.
        </div>
      </div>
      <div class="sep"></div>
      <div class="formField ">
        <label class="formFieldLabel" for="summary">Short Summary</label>
        <div class="relative">
          <!-- <j-input
            :value="workorderCreateObject.customer.name"
            id="summary"
            @input="setFieldValue('title', $event)"
          /> -->
        </div>

        <div class="formFieldTip">
          Concisely summarize the workorder in one or two sentences.
        </div>
      </div>

      <div class="formField ">
        <label class="formFieldLabel" for="description">Description</label>
        <j-text-editor
          :mode="`write`"
          @input="setFieldValue('description', $event)"
          class="descriptionEditor"
          id="description"
        />
        <div class="formFieldTip">
          Describe the workorder in as much detail as you'd like.
        </div>
      </div>
      <div class="formField ">
        <label class="formFieldLabel" for="reporter">Reporter</label>
        <j-select
          id="reporter"
          searchable
          :value="workorderCreateObject.reporterId"
          :options="projectUsers"
          customRender
          @change="setFieldValue('reporterId', $event)"
        >
          <template v-slot:default="{ label, user, remove, optionValue }">
            <div class="my-px mr-4 flex items-center">
              <j-avatar
                :size="20"
                :avatarUrl="user.avatarUrl"
                :name="user.name"
              />
              <div class="pr-1 pl-2">
                {{ label }}
              </div>
              <j-icon
                v-if="remove"
                @click="remove(optionValue)"
                class="text-textLight"
                :size="20"
                name="times"
              ></j-icon>
            </div>
          </template>
        </j-select>
      </div>
      <div class="formField ">
        <label class="formFieldLabel" for="userIds">Assignees</label>
        <j-select
          id="userIds"
          :value="workorderCreateObject.userIds"
          searchable
          :options="projectUsers"
          :isMulti="true"
          @change="setFieldValue('userIds', $event)"
          customRender
        >
          <template v-slot:default="{ label, user, remove, optionValue }">
            <div class="my-px mr-4 flex items-center">
              <j-avatar
                :size="20"
                :avatarUrl="user.avatarUrl"
                :name="user.name"
              />
              <div class="pr-1 pl-2">
                {{ label }}
              </div>
              <j-icon
                v-if="remove"
                @click="remove(optionValue)"
                class="text-textLight"
                :size="20"
                name="times"
              ></j-icon>
            </div>
          </template>
        </j-select>
      </div>
      <div class="formField ">
        <label class="formFieldLabel" for="priority">Priority</label>
        <j-select
          id="priority"
          :value="workorderCreateObject.priority"
          searchable
          :options="
            Object.values(WorkorderPriority).map(p => ({
              value: p,
              label: WorkorderPriorityCopy[p],
              icon: p < 3 ? 'arrow-down' : 'arrow-up',
              color: workorderPriorityColors[p]
            }))
          "
          customRender
          @change="setFieldValue('priority', $event)"
        >
          <template v-slot:default="{ label, icon, color }">
            <div class="my-px mr-4 flex items-center">
              <j-icon :style="{ color }" :size="20" :name="icon"></j-icon>

              <div class="pr-1 pl-2">
                {{ label }}
              </div>
            </div>
          </template>
        </j-select>
        <div class="formFieldTip">
          Priority in relation to other workorders.
        </div>
      </div>
      <div class="formField flex justify-end items-center">
        <j-button
          :isWorking="isWorking"
          @click.prevent="handleSubmit"
          :disabled="!isValidDTO"
          class="ml-3"
          variant="primary"
          >Create</j-button
        >
        <j-button
          @click.prevent="$emit('close')"
          class="ml-3"
          variant="secondary"
          >Cancel</j-button
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from '@vue/composition-api'
import { getters, mutations } from '@/store'
import {
  Workorder,
  WorkorderType,
  WorkorderPriority,
  WorkorderPriorityCopy,
  WorkorderTypeCopy,
  WorkorderStatus,
  WorkorderCreateDTO
} from '@/types/workorder'
import { workorderPriorityColors } from '@/utils/colors'
import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  createWorkorder,
  getProjectWorkorders
} from '@/graphql/queries/workorder'
import Omit from 'lodash.omit'
import { successToast, errorToast } from '../../../../plugins/toast'
type fieldType =
  | 'type'
  | 'customer'
  | 'description'
  | 'reporterId'
  | 'userIds'
  | 'priority'
  | 'status'
export default defineComponent({
  setup(_, { emit }) {
    const project = computed(getters.project)
    const currentUser = computed(getters.currentUser)
    const projectUsers = computed(() => {
      if (!project.value) return []
      return project.value.users.map(user => ({
        value: user.id,
        label: user.name,
        user
      }))
    })

    const defaultWorkorderValues = {
      // type: WorkorderType.INHOUSE,
      // // customerName: '',
      // description: '',
      // reporterId: currentUser.value.id,
      // userIds: [],
      // priority: WorkorderPriority.MEDIUM

        type: WorkorderType.INHOUSE,
  customer: '',
  description: '',
  reporterId: '',
  userIds: [''],
  priority: WorkorderPriority.LOW,
  status: WorkorderStatus.WAITING,
  projectId: '',
    }

    const workorderCreateObject = reactive<WorkorderCreateDTO>(
      defaultWorkorderValues
    )
    const isRequired = (value: string) =>
      ['', null, undefined].indexOf(value) === -1

    const isValidDTO = computed(
      () =>
        isRequired(workorderCreateObject.type) &&
        // isRequired(workorderCreateObject.customer) &&
        isRequired(workorderCreateObject.reporterId) &&
        isRequired(workorderCreateObject.priority)
    )

    // eslint-disable-next-line
    const setFieldValue = (field: fieldType, value: any) => {
      workorderCreateObject[field] = (value as unknown) as never
    }

    const loading = ref<boolean>(false)

    const { mutate, loading: isMutationLoading } = useMutation(createWorkorder)
    const {
      refetch: fetchProjectWorkorders,
      loading: isFetchWorkordersLoading
    } = useQuery<{
      getProjectWorkorders: Workorder[]
    }>(getProjectWorkorders)

    const isWorking = computed(
      () => loading.value && isFetchWorkordersLoading && isMutationLoading
    )

    const getUserById = (userId: string) =>
      Omit(
        project.value.users.find(user => user.id === userId),
        ['__typename', 'name', 'avatarUrl', 'projectId']
      )

    const handleSubmit = async () => {
      loading.value = true
      const workorder: any = {
        ...workorderCreateObject,
        status: WorkorderStatus.WAITING,
        projectId: project.value.id,
        // users: workorderCreateObject.userIds.map(getUserById)
      }
      try {
        // eslint-disable-next-line
        await mutate({ workorder } as any)
        const res = await fetchProjectWorkorders()
        if (res.data) {
          mutations.setProject({
            ...project.value,
            workorders: res.data.getProjectWorkorders
          })
        }
        loading.value = false
        emit('close')
        successToast('Workorder has been successfully created').showToast()
      } catch (error) {
        console.error(error)
        emit('close')
      }
    }

    return {
      workorderCreateObject,
      projectUsers,
      WorkorderType,
      isValidDTO,
      WorkorderTypeCopy,
      WorkorderPriority,
      WorkorderPriorityCopy,
      workorderPriorityColors,
      setFieldValue,
      handleSubmit,
      isWorking
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

<style lang="scss">
.descriptionEditor .ql-editor {
  min-height: 110px;
}
</style>
