const AdminSkillData = {
  greeting: {
    welcome: "Welcome Back",
    name: "John",
    info: "Here is the information about",
    profile: "skill",
    showButtons: false,
  },
  DataView: {
    data: [
      {
        miniHeading: "SKILL4785",
        mainHeading: "Java",
        Count: 53,
        cardType: "skill",
        canEdit: true,
      },
      {
        miniHeading: "SKILL4785",
        mainHeading: "Java",
        Count: 53,
        cardType: "skill",
        canEdit: true,
      },
    ],
    tableColumns: [
      { key: "miniHeading", displayName: "Skill ID" },
      { key: "mainHeading", displayName: "Skill Name" },
      { key: "Count", displayName: "Count" },
    ],
    toggle: true,
    itemsPerPage: 15,
    cardType: "skillbatchcardskill",
  },
};

export default AdminSkillData;
