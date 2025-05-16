import skillBatchCard from "./SkillBatchCard";
import { action } from "@storybook/addon-actions";

export default {
    title: "components/cards/SkillBatch Card",
    component: skillBatchCard,
};

const batch = {
    miniHeading: "B301",
    mainHeading: "Batch 1",
    Count: 28,
    cardType: "batch",
    handleClick: action("Card clicked!"),
    canEdit: false,
    creationDate: "2023-01-15T12:00:00Z",
};

const skill = {
    miniHeading: "SKILL4785",
    mainHeading: "Java",
    Count: 53,
    cardType: "skill",
    handleClick: action("Card clicked!"),
    handleDeleteClick: action("Delete Icon Clicked!"),
    handleEditClick: action("Edit button clicked!"),
};

export const BatchCard = {
    args: {
        ...batch,
    },
};

export const skillCardEditDelete = {
    args: {
        ...skill,
        canEdit: true,
        canDelete: true,
    },
};

export const skillCardEdit = {
    args: {
        ...skill,
        canEdit: true,
        canDelete: false,
    },
};