import { useNavigate } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList"
import type { ProjectInterface } from "../../interface/project"
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const ProjectListPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)

  const onView = (record: ProjectInterface) => {
    navigate(`/projects/${record.id}`)
  };

  const onEdit = (record: ProjectInterface) => {
    navigate(`/projects/${record.id}/edit`)
  };

  const onDelete = (record: ProjectInterface) => {
    console.log("Delete", record);
  };
  debugger

  return (
    <ProjectList role={1} onEdit={onEdit} onDelete={onDelete} onView={onView}/>
  )
}

export default ProjectListPage
