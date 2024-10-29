interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface MenuItem {
  title: string;
  action: () => void;
}

class Menu {
  private items: MenuItem[] = [];

  addItem(item: MenuItem): void {
    this.items.push(item);
  }

  showMenu(): void {
    console.log("Menú:");
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
    });
  }

  selectItem(index: number): void {
    if (index >= 1 && index <= this.items.length) {
      this.items[index - 1].action();
    } else {
      console.log("Opción no válida.");
    }
  }
}

const mergePostWithUsers = (posts: Post[], users: User[]) => {
  return posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    return {
      ...post,
      user,
    };
  });
};

const getUserIdByPost = (posts: Post[]) => {
  const userIds = posts.reduce((acc, item) => {
    if (!acc.includes(item.userId)) {
      acc.push(item.userId);
    }
    return acc;
  }, [] as number[]);
  return userIds;
};

// Configurar el menú
const menu = new Menu();
menu.addItem({
  title: "Merge Post With Users",
  action: () => {
    console.log("Llamando a mergePostWithUsers...");
    const posts: Post[] = [
      { id: 1, userId: 1, title: "Post 1", body: "Content 1" },
      { id: 2, userId: 2, title: "Post 2", body: "Content 2" }
    ];
    const users: User[] = [
      { id: 1, name: "User 1", username: "user1", email: "user1@example.com" },
      { id: 2, name: "User 2", username: "user2", email: "user2@example.com" }
    ];
    const result = mergePostWithUsers(posts, users);
    console.log("Resultado de mergePostWithUsers:", JSON.stringify(result, null, 2));
  }
});
menu.addItem({
  title: "Get User IDs By Post",
  action: () => {
    console.log("Llamando a getUserIdByPost...");
    const posts: Post[] = [
      { id: 1, userId: 1, title: "Post 1", body: "Content 1" },
      { id: 2, userId: 2, title: "Post 2", body: "Content 2" },
      { id: 3, userId: 1, title: "Post 3", body: "Content 3" }
    ];
    const result = getUserIdByPost(posts);
    console.log("Resultado de getUserIdByPost:", JSON.stringify(result, null, 2));
  }
});

// Mostrar el menú
menu.showMenu();

// Seleccionar las opciones
//menu.selectItem(1);
menu.selectItem(1);
