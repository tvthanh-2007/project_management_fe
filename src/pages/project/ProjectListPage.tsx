import { useNavigate } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList"
import type { ProjectInterface } from "../../interface/project"
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import type { Role } from "../../constants/user";

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
  return (
    <ProjectList role={user ? (user.role as Role) : null} onEdit={onEdit} onDelete={onDelete} onView={onView}/>
  )
}

export default ProjectListPage
