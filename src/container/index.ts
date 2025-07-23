import AuthService from "@/core/services/AuthService";
import TaskService from "@/core/services/TaskService";
import AuthAPI from "@/infra/auth/AuthAPI";
import TaskMock from "@/infra/tasks/TaskMock";
import AuthMock from "@/infra/auth/AuthMock";

const AuthServiceInstance = new AuthService(new AuthMock());
const TaskServiceInstance = new TaskService(new TaskMock());

export const services = {
  AuthService: AuthServiceInstance,
  TaskService: TaskServiceInstance,
};
