import { useNavigate } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList"
import type { ProjectInterface } from "../../interface/project"

const ProjectListPage = () => {
  const navigate = useNavigate();

  const onView = (record: ProjectInterface) => {
    navigate(`/projects/${record.id}`)
  };

  const onEdit = (record: ProjectInterface) => {
    navigate(`/projects/${record.id}/edit`)
  };

  const onDelete = (record: ProjectInterface) => {
    console.log("Delete", record);
  };

  return (
    <ProjectList role="admin" onEdit={onEdit} onDelete={onDelete} onView={onView}/>
  )
}

export default ProjectListPage
