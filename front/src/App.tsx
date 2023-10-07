import { Layout } from "antd";

import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/List";
import { TodoListProvider } from "./contexts";

function App() {
  return (
    <TodoListProvider>
      <Layout className="container">
        <Header />
        <TodoList />
      </Layout>
    </TodoListProvider>
  );
}

export default App;
 