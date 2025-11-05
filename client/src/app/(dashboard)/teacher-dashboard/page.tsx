import { DashboardLayout } from "./components/DashboardLayout";
import { HomeTabNav } from "./components/HomeTabNav";


import { Holiday } from "./components/Holiday";


export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <HomeTabNav />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Holiday />
        </div>
      </div>
    </DashboardLayout>
  );
}
