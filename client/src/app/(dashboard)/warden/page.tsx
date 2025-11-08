import { DashboardLayout } from "./components/DashboardLayout";
import { HomeTabNav } from "./components/HomeTabNav";
import { PersonalSpace } from "./components/PersonalSpace";
import OutpassQueue  from "./components/OutpassQueue";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <HomeTabNav />
        <OutpassQueue />
      </div>
    </DashboardLayout>
  );
}
