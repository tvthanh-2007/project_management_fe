import { useNavigate } from "react-router-dom";
import ProjectList from "../../components/project/ProjectList"
import type { ProjectInterface } from "../../interface/project"
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import type { Role } from "../../constants/user";
import { useEffect, useState } from "react";
import { deleteProjectApi, getProjectsApi } from "../../services/projectService";
import { notification } from "antd";

const ProjectListPage = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([])
  const navigate = useNavigate();
  const user = useSelector(selectUser)

  const onView = (record: ProjectInterface) => {
    navigate(`/projects/${record.id}`)
  };

  const onEdit = (record: ProjectInterface) => {
    navigate(`/projects/${record.id}/edit`)
  };

  const onDelete = async (record: ProjectInterface) => {
    const newProjects = projects.filter(e => e.id !== record.id)
    setProjects(newProjects)

    const res = await deleteProjectApi(record.id)
    notification.success({message: res.data.message, placement: "top"});
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjectsApi();
        setProjects(projects.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    }

    fetchProjects()
  }, []);

  return (
    <ProjectList role={user ? (user.role as Role) : null} onEdit={onEdit} onDelete={onDelete} onView={onView} projects={projects}/>
  )
}

export default ProjectListPage
