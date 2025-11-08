import { DashboardLayout } from "./components/DashboardLayout";
import { HomeTabNav } from "./components/HomeTabNav";
import { PersonalSpace } from "./components/PersonalSpace";
import { GPA } from "./components/GPA";
import { AttendanceChart } from "./components/AttendenceChart";
import { Holiday } from "./components/Holiday";
import { Outpass } from "./components/Outpass";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <HomeTabNav />

        <PersonalSpace />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GPA />
          <AttendanceChart />
          <Holiday />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Outpass />
        </div>
      </div>
    </DashboardLayout>
  );
}
