import ClassComponent from "./components/ClassComponent.tsx";
import FunctionalComponent from "./components/FunctionalComponent.tsx";
import ArrowFunctionalComponent from "./components/ArrowFunctionalComponent.tsx";
import ArrowFunctionalComponentWithProps from "./components/ArrowFunctionalComponentWithProps.tsx";
import ArrowFunctionalComponentWithPropsType from "./components/ArrowFunctionalComponentWithPropsType.tsx";

function App() {

  return (
    <>
        <ClassComponent/>
        <FunctionalComponent/>
        <ArrowFunctionalComponent/>
        <ArrowFunctionalComponentWithProps title="Is a Arrow Component with Props!"/>
        <ArrowFunctionalComponentWithPropsType title="Is a Arrow Component with Props!" description="This is a description."/>

    </>
  )
}

export default App
