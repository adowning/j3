<template>
  <div>
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      Reporter
    </div>
    <j-select
      searchable
      variant="empty"
      :withClearValue="false"
      :dropdownWidth="300"
      :value="reporterId"
      :options="userOptions"
      customRender
      customRenderOption
      @change="updateWorkorderReporter"
    >
      <template v-slot:default="{ user }">
        <j-button variant="secondary">
          <div class="flex items-center">
            <j-avatar
              :size="20"
              :avatarUrl="user.avatarUrl"
              :name="user.name"
            />
            <div class="ml-1-5 mr-1">
              {{ user.name }}
            </div>
          </div>
        </j-button>
      </template>
      <template v-slot:option="{ user }">
        <div class="my-px mr-4 flex items-center">
          <j-avatar :size="20" :avatarUrl="user.avatarUrl" :name="user.name" />
          <div class="ml-1-5 mr-1">
            {{ user.name }}
          </div>
        </div>
      </template>
    </j-select>
    <!-- ASSIGNEES -->
    <div class="mt-6 mb-1 uppercase text-textMedium text-13 font-bold">
      Assignees
    </div>
    <j-select
      searchable
      variant="empty"
      isMulti
      :withClearValue="false"
      :dropdownWidth="300"
      :value="userIds"
      :options="userOptions"
      customRender
      customRenderOption
      @change="updateWorkorderAssignees"
    >
      <template v-slot:default="{ user, remove, optionValue }">
        <j-button variant="secondary">
          <div class="flex items-center">
            <j-avatar
              :size="20"
              :avatarUrl="user.avatarUrl"
              :name="user.name"
            />
            <div class="ml-1-5 mr-1.5">
              {{ user.name }}
            </div>
            <j-icon
              v-if="remove"
              @click="remove(optionValue)"
              class="text-textLight"
              :size="20"
              name="times"
            ></j-icon>
          </div>
        </j-button>
      </template>
      <template v-slot:option="{ user }">
        <div class="my-px mr-4 flex items-center">
          <j-avatar :size="20" :avatarUrl="user.avatarUrl" :name="user.name" />
          <div class="ml-1-5 mr-1">
            {{ user.name }}
          </div>
        </div>
      </template>
    </j-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { getters } from '../../../../store'
import Omit from 'lodash.omit'
export default defineComponent({
  props: {
    reporterId: {
      type: String,
      required: true
    },
    userIds: {
      type: Array as () => Array<string>,
      required: true
    },
    updateWorkorder: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const project = computed(getters.project)
    const userOptions = project.value.users.map(user => ({
      label: user.name,
      value: user.id,
      user
    }))
    const getUserById = (userId: string) =>
      Omit(
        project.value.users.find(user => user.id === userId),
        ['__typename']
      )
    const updateWorkorderReporter = async (userId: string) => {
      try {
        await props.updateWorkorder({ reporterId: userId })
      } catch (error) {
        console.error(error)
      }
    }
    const updateWorkorderAssignees = async (userIds: [string]) => {
      try {
        await props.updateWorkorder({
          userIds,
          users: userIds.map(getUserById)
        })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      userOptions,
      updateWorkorderReporter,
      updateWorkorderAssignees
    }
  }
})
</script>

<style></style>
