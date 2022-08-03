export default function (recipe = {}, action) {
    if (action.type == 'setRecipe') {
        console.log(action.recipe)
        return action.recipe
    } else {
        return recipe
    }
}