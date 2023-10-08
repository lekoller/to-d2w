import { Layout } from "antd";

import "./App.css";
import { TodoList, Header } from "./components";
import { TodoListProvider, SpinProvider } from "./contexts";
import { EditItemProvider } from "./contexts";

function App() {
  return (
    <SpinProvider>
      <TodoListProvider>
        <Layout className="container">
          <Header />
          <EditItemProvider>
            <TodoList />
          </EditItemProvider>
        </Layout>
      </TodoListProvider>
    </SpinProvider>
  );
}

export default App;
