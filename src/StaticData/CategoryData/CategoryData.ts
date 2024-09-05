import Spices from "../../../public/images/spices.webp"
import salt_sugar from "../../../public/images/salt-sugar.webp"
import Rice from "../../../public/images/rice.webp"
import Dal from "../../../public/images/dal-or-lentil.webp"
import Readymix from "../../../public/images/ready-mix.webp"
import shemai_suji from "../../../public/images/shemai-suji.webp"
import Oil from "../../../public/images/oil.webp"






export const GetCategory = async () => {
    // Simulate a list of 10 dummy categories
    const categoryList = [
        {
            id: 1,
            categoryName: "spices",
            categoryTitle: "Spices",
            categoryImage: Spices,
            link: "spices",
        },
        {
            id: 2,
            categoryName: "salt_sugar",
            categoryTitle: "Salt & Sugar",
            categoryImage: salt_sugar,
            link: "salt-sugar",
        },
        {
            id: 3,
            categoryName: "rice",
            categoryTitle: "Rice",
            categoryImage: Rice,
            link: "rice",
        },
        {
            id: 4,
            categoryName: "dal",
            categoryTitle: "Dal",
            categoryImage: Dal,
            link: "dal",
        },
        {
            id: 5,
            categoryName: "readymix",
            categoryTitle: "Ready Mix",
            categoryImage: Readymix,
            link: "ready-mix",
        },
        {
            id: 6,
            categoryName: "shemai_suji",
            categoryTitle: "Shemai & Suji",
            categoryImage: shemai_suji,
            link: "shemai-suji",
        },
        {
            id: 7,
            categoryName: "oil",
            categoryTitle: "Oil",
            categoryImage: Oil,
            link: "oil",
        },
    ];

    return categoryList;
};