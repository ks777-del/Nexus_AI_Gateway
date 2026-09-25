import { AgentDefinition, AgentRole } from './types';

export class AgentRegistry {
  private agents: Map<string, AgentDefinition> = new Map();

  constructor() {
    this.registerDefaultAgents();
  }

  private registerDefaultAgents() {
    const defaults: AgentDefinition[] = [
      {
        id: 'default-planner',
        role: 'planner',
        name: 'Strategic Planner',
        description: 'Breaks down complex tasks into actionable plans.',
        systemPrompt: 'You are a strategic planner. Analyze the user request and create a step-by-step plan.',
        capabilities: ['planning', 'analysis']
      },
      {
        id: 'default-coder',
        role: 'coder',
        name: 'Senior Developer',
        description: 'Writes production-quality code based on requirements.',
        systemPrompt: 'You are a senior developer. Write clean, efficient, and well-documented code.',
        capabilities: ['coding', 'software-design']
      },
      {
        id: 'default-reviewer',
        role: 'reviewer',
        name: 'Code Reviewer',
        description: 'Reviews code for bugs, performance, and best practices.',
        systemPrompt: 'You are a strict code reviewer. Find bugs and suggest improvements.',
        capabilities: ['reviewing', 'quality-assurance']
      }
    ];

    defaults.forEach(agent => this.register(agent));
  }

  register(agent: AgentDefinition) {
    this.agents.set(agent.id, agent);
  }

  get(id: string): AgentDefinition | undefined {
    return this.agents.get(id);
  }

  getByRole(role: AgentRole): AgentDefinition[] {
    return Array.from(this.agents.values()).filter(a => a.role === role);
  }

  getAll(): AgentDefinition[] {
    return Array.from(this.agents.values());
  }
}
