import React from "react";
import DashboardHabitSection from "../habits/components/DashboardHabitSection";
import TaskListSection from "../tasks/components/TaskListSection";
import "../../shared/styles/Dashboard.css";
import DashboardCategoriesCard from "../categories/components/DashboardCategoriesCard";
import SummaryCard from "../../shared/components/SummaryCard";
import DashboardCard from "../../shared/components/DashboardCard";
import { PieChart } from "lucide-react";

const OverviewPage = () => {


  return (
    <div>
      <div className="dashboard-row">
        <DashboardHabitSection />
        <TaskListSection />
      </div>
      <div className="dashboard-row">
        <DashboardCategoriesCard/>
        <DashboardCard
          title="Task Progress"
          icon={<PieChart size={18} />}
          fixedHeight={true}
          pagination={false}
          items={[<SummaryCard key="task-summary" />]}
        />
      </div>{" "}
    </div>
  );
};

export default OverviewPage;
