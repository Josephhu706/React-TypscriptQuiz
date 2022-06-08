

//this takes our array from API.ts and shuffles it
export const shuffleArray = (array: any[])=> {
    return [...array].sort(()=> Math.random() - 0.5)
}