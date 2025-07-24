import { TaskProps } from "@/ui/components/tasks";

export const tasks: TaskProps[] = [
  {
    id: "1",
    title: "Criar tipagem do retorno da API de tarefas",
    description: "Definir a estrutura de dados para as tarefas.",
    dueDate: "2023-10-15T00:00:00Z",
    priority: "HIGH",
    status: "PLANNED",
    subtasks: [
      {
        id: "1.1",
        title: "Mapear dados do backend",
        status: "PLANNED",
      },
      {
        id: "1.2",
        title: "Criar interface TaskResponse",
        status: "PLANNED",
      },
    ],
  },
  {
    id: "2",
    title: "Implementar componente de tarefa",
    description: "Criar o componente Task para exibir as tarefas.",
    dueDate: "2023-10-20T00:00:00Z",
    priority: "MEDIUM",
    status: "PLANNED",
  },
  {
    id: "3",
    title: "Adicionar testes para o componente Task",
    description: "Criar testes automatizados para o componente Task.",
    dueDate: "2023-10-25T00:00:00Z",
    priority: "LOW",
    status: "PLANNED",
  },
  {
    id: "4",
    title: "Criar layout base",
    priority: "HIGH",
    status: "PLANNED",
  },
  {
    id: "5",
    title: "Planejar sessões de testes",
    status: "PLANNED",
  },
  {
    id: "6",
    title: "Configurar ESLint e Prettier",
    dueDate: "2023-11-01T00:00:00Z",
    status: "PLANNED",
  },
  {
    id: "7",
    title: "Esboçar arquitetura inicial do projeto",
    status: "PLANNED",
    subtasks: [
      {
        id: "7.1",
        title: "Escolher padrão de arquitetura",
        status: "DONE",
      },
      {
        id: "7.2",
        title: "Definir camadas principais",
        status: "PLANNED",
      },
      {
        id: "7.3",
        title: "Desenhar fluxo de dados",
        status: "PLANNED",
      },
    ],
  },
  {
    id: "8",
    title: "Documentar endpoints iniciais",
    priority: "MEDIUM",
    dueDate: "2023-11-10T00:00:00Z",
    status: "PLANNED",
  },
  {
    id: "9",
    title: "Estudo de benchmarks para performance",
    status: "PLANNED",
  },
  {
    id: "10",
    title: "Criação de persona para testes",
    status: "PLANNED",
  },
  {
    id: "11",
    title: "Criar fluxo de autenticação",
    description: "Login, cadastro e recuperação de senha.",
    priority: "URGENT",
    dueDate: "2023-10-22T00:00:00Z",
    status: "PLANNED",
    subtasks: [
      {
        id: "11.1",
        title: "Criar rota de login",
        status: "PLANNED",
      },
      {
        id: "11.2",
        title: "Criar rota de cadastro",
        status: "PLANNED",
      },
      {
        id: "11.3",
        title: "Criar rota de recuperação de senha",
        status: "PLANNED",
      },
    ],
  },
  {
    id: "12",
    title: "Conectar frontend com backend",
    description: "Integração básica utilizando fetch/axios.",
    priority: "HIGH",
    status: "TO_DO",
  },
  {
    id: "13",
    title: "Ajustar responsividade",
    dueDate: "2023-10-30T00:00:00Z",
    priority: "MEDIUM",
    status: "TO_DO",
  },
  {
    id: "14",
    title: "Revisar nomenclatura de variáveis",
    status: "TO_DO",
  },
  {
    id: "15",
    title: "Refatorar service de usuários",
    description: "Melhorar separação de responsabilidades.",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    subtasks: [
      {
        id: "15.1",
        title: "Separar regras de negócio",
        status: "DONE",
        subtasks: [
          { id: "15.1.1", title: "Criar camada de serviço", status: "DONE" },
        ],
      },
      { id: "15.2", title: "Isolar validações", status: "DONE" },
      { id: "15.3", title: "Criar camada de repositório", status: "DONE" },
      {
        id: "15.4",
        title: "Refatorar chamadas do controller",
        status: "IN_PROGRESS",
      },
      { id: "15.5", title: "Escrever testes", status: "PLANNED" },
    ],
  },
  {
    id: "16",
    title: "Setup inicial do projeto",
    description: "Criação do repositório e estrutura base.",
    status: "DONE",
    priority: "HIGH",
  },
  {
    id: "17",
    title: "Configuração do Tailwind CSS",
    dueDate: "2023-10-10T00:00:00Z",
    status: "DONE",
  },
  {
    id: "18",
    title: "Implementar dark mode",
    priority: "LOW",
    status: "DONE",
  },
  {
    id: "19",
    title: "Revisar README",
    status: "DONE",
    subtasks: [
      {
        id: "19.1",
        title: "Corrigir instruções de instalação",
        status: "DONE",
      },
    ],
  },
  {
    id: "20",
    title: "Testar build de produção",
    priority: "MEDIUM",
    status: "DONE",
  },
];
