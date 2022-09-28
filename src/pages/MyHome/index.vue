<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend/>
    <Rank />
    <MyLike />
    <MyFloor v-for="floor in floorList" :key="floor.id" :floor="floor"></MyFloor>
    <MyBrand />
  </div>
</template>

<script>
import TypeNav from '@/components/Type-nav';
import ListContainer from './ListContainer';
import TodayRecommend from './TodayRecommend';
import Rank from './Rank'
import MyLike from './MyLike'
import MyFloor from './MyFloor'
import MyBrand from './MyBrand'
import { mapState } from 'vuex';
// import { mapState ,mapActions} from 'vuex';
export default {
    name: "MyHome",
  components: { TypeNav ,ListContainer,TodayRecommend,Rank,MyLike,MyFloor,MyBrand},
  methods: {
   
  },
  computed: {
        ...mapState({'floorList':state=>state.home.floorList})
    },
 mounted() {
   this.$store.dispatch('GetFloorList')
  
    
},
}
</script>

<style>

</style>