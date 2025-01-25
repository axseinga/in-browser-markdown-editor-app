interface SortMarkdownsByDateT {
  createdAt: string;
}

export const sortMarkdownsByDate = (markdowns: SortMarkdownsByDateT[]) => {
  return markdowns.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
