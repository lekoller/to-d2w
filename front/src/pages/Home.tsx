import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import { TodoList, Header } from "../components";
import { TodoListProvider, useAuth } from "../contexts";
import { EditItemProvider } from "../contexts";

function Home() {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/auth" />;
  }

  return (
    <TodoListProvider>
      <Layout className="container">
        <Header />
        <EditItemProvider>
          <TodoList />
        </EditItemProvider>
      </Layout>
    </TodoListProvider>
  );
}

export default Home;
