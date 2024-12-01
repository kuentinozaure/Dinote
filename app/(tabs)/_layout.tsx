import TabBar from "@/components/tab-bar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs tabBar={(props) => <TabBar {...props}></TabBar>}></Tabs>;
}
