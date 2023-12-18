<template>
    <div>
        <router-view></router-view>
        <tabbar/>
    </div>
</template>

<script>
import tabbar from "@/components/tabbar/index.vue"
    export default {
        components:{tabbar}
    }
</script>

<style scoped>

</style>