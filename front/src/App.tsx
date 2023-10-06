import { Layout } from "antd";
import "./App.css";

import Header from "./components/Header";
import TodoList from "./components/List";
import data from "./assets/dataExample.json";

function App() {
  return (
    <Layout className="container">
      <Header />
      <TodoList items={data} />
    </Layout>
  );
}

export default App;
