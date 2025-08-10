import ProjectList from "../../components/project/ProjectList"
import type { Project } from "../../interface/project"

const onView = (record: Project) => {
  console.log("View", record);
};

const onEdit = (record: Project) => {
  console.log("Edit", record);
};

const onDelete = (record: Project) => {
  console.log("Delete", record);
};


const ProjectListPage = () => {
  return (
    <ProjectList role="admin" onEdit={onEdit} onDelete={onDelete} onView={onView}/>
  )
}

export default ProjectListPage
