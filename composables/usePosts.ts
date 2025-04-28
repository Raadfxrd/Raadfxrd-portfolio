export const usePosts = async () => {
    const {data: posts} = await useAsyncData('posts', () =>
        queryContent('posts')
            .sort({date: -1})
            .find()
    )

    return posts
}