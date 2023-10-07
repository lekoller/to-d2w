import { Layout } from "antd";

import "./App.css";
import Header from "./components/Header";
import { TodoList } from "./components";
import { TodoListProvider } from "./contexts";
import SpinProvider from "./contexts/SpinContext";

function App() {
  return (
    <SpinProvider>
      <TodoListProvider>
        <Layout className="container">
          <Header />
          <TodoList />
        </Layout>
      </TodoListProvider>
    </SpinProvider>
  );
}

export default App;
