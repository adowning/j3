<template>
  <div class="px-8 pb-16 pt-6">
    <div class="relative pr-7 mb-10">
      <j-input
        ref="searchInputRef"
        class="flat text-textMedium"
        icon="search"
        @input="handleSearchChange"
        :value="searchTerm"
        :iconSize="26"
        placeholder="Search warehouseboarditems by summary, description..."
      />
    </div>
    <div
      class="pt-10 flex flex-col justify-center items-center"
      v-if="loading && !isSearchTermEmpty"
    >
      <Spinner />
    </div>
    <div class="fadeIn" v-else>
      <div v-if="isSearchTermEmpty && recentWarehouseBoardItems.length > 0">
        <div class="sectionTitle">Recent WarehouseBoardItems</div>
        <SearchResult
          v-for="warehouseboarditem in recentWarehouseBoardItems"
          :key="warehouseboarditem.id"
          :warehouseboarditem="warehouseboarditem"
        />
      </div>
      <div v-if="!isSearchTermEmpty && matchingWarehouseBoardItems.length > 0">
        <div class="sectionTitle">Matching WarehouseBoardItems</div>
        <SearchResult
          v-for="warehouseboarditem in matchingWarehouseBoardItems"
          :key="warehouseboarditem.id"
          :warehouseboarditem="warehouseboarditem"
        />
      </div>
      <div
        class="pt-10 flex flex-col justify-center items-center"
        v-if="!isSearchTermEmpty && !loading && matchingWarehouseBoardItems.length === 0"
      >
        <j-icon :size="125" name="no-result"></j-icon>
        <div class="pt-8 font-medium text-xl">
          We couldn&apos;t find anything matching your search
        </div>
        <div class="pt-2 text-15">Try again with a different term.</div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import SearchResult from './SearchResult.vue'
import Loader from '@/components/Loader.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getProjectWarehouseBoardItems } from '@/graphql/queries/warehouseboarditem'
import { WarehouseBoardItem } from '@/types/warehouseboarditem'
import { getters } from '@/store'
import { debounce } from 'throttle-debounce'
import { CombinedVueInstance } from 'vue/types/vue'
// eslint-disable-next-line
const sortByNewest = (items: any[] = [], sortField: string) =>
  items.sort((a, b) => -a[sortField].localeCompare(b[sortField]))

export default defineComponent({
  components: {
    SearchResult,
    Spinner: Loader
  },
  setup() {
    const isSearchTermEmpty = ref<boolean>(true)
    const searchTerm = ref<string>('')
    const searchInputRef = ref<
      CombinedVueInstance<Vue, object, object, object, object>
    >(null)
    const { result, refetch, loading } = useQuery<WarehouseBoardItem[]>(getProjectWarehouseBoardItems, {
      searchTerm: searchTerm.value
    })

    const project = computed(getters.project)

    const matchingWarehouseBoardItems = useResult(result, [])
    const recentWarehouseBoardItems = computed(() =>
      sortByNewest(project.value.warehouseBoardItems, 'createdAt').slice(0, 10)
    )

    const handleSearchChange = debounce(500, (value: string) => {
      searchTerm.value = value.trim()
      isSearchTermEmpty.value = !searchTerm.value
      if (searchTerm.value) {
        refetch({ searchTerm: searchTerm.value })
      }
    })

    onMounted(() => {
      if (searchInputRef.value) {
        const inputEl = searchInputRef.value.$el.querySelector('input')
        if (inputEl) {
          inputEl.focus()
        }
      }
    })

    return {
      matchingWarehouseBoardItems,
      loading,
      recentWarehouseBoardItems,
      isSearchTermEmpty,
      handleSearchChange,
      searchTerm,
      searchInputRef
    }
  }
})
</script>

<style lang="postcss" scoped>
.sectionTitle {
  @apply text-textMedium font-bold text-xs uppercase pb-3;
}
</style>

<style lang="scss"></style>
