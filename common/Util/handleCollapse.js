function handleCollapse(index){
    const {isCollapsed} = this.state;
    isCollapsed[index] = !isCollapsed[index];
    this.setState({
        isCollapsed: isCollapsed,
    });
}

export default handleCollapse;