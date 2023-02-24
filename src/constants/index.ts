export const CONSTANTS = {
  get name_application() {
    return "JOBITE";
  },

  get description_application() {
    return `${this.name_application} oference uma grande variedade de vagas voltado para tecnologia. Também oferecemos suporte para empresas que estão procurando profissionais.`;
  },

  get price_filter() {
    return [1000, 50000];
  },

  get initial_price() {
    return {
      min: 1000,
      max: 50000,
    };
  },
};
