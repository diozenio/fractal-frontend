import AuthService from "@/core/services/AuthService";
import TaskService from "@/core/services/TaskService";
import AuthAPI from "@/infra/auth/AuthAPI";
import TaskAPI from "@/infra/tasks/TaskAPI";

const AuthServiceInstance = new AuthService(new AuthAPI());
const TaskServiceInstance = new TaskService(new TaskAPI());

export const services = {
  AuthService: AuthServiceInstance,
  TaskService: TaskServiceInstance,
};
