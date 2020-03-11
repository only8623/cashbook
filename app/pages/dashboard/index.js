import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Input, Icon, Form, Modal, message } from 'antd'

import './stylesheets/index.less'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const ROUTE_CONFIGS = [
  {
    isSubMenu: true,
    title: '记账本',
    key: 'cashbook',
    children: [
      {
        path: '/dashboard',
        exact: true,
        title: '账单总览',
        component: () => <div>账单总览</div>
      },
      {
        path: '/dashboard/m',
        title: '月度账单',
        component: () => <div>月度账单</div>
      }
    ]
  },
  {
    path: '/about',
    title: '关于作者',
    component: false
  }
]

class Dashboard extends React.Component {
  renderHeader () {
    return (
      <Header>
        <span className='dashboard__header'>简易记账</span>
      </Header>
    )
  }

  renderContentRoute (item) {
    if (item.isSubMenu) {
      return item.children.reduce((pre, v) => {
        const currentResult = this.renderContentRoute(v)
        pre = pre.concat(Array.isArray(currentResult) ? currentResult : [currentResult])
        return pre
      }, [])
    } else if (item.component) {
      return <Route key={item.path} {...item} />
    } else {
      return false
    }
  }

  renderContent () {
    const tempObject = {
      isSubMenu: true,
      children: ROUTE_CONFIGS
    }

    return (
      <Content className='dashboard__content'>
        {this.renderContentRoute(tempObject)}
      </Content>
    )
  }

  renderMenuItem (item) {
    if (item.isSubMenu) {
      return (
        <SubMenu key={item.key} title={item.title}>
          {item.children.map(v => this.renderMenuItem(v))}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      )
    }
  }

  renderSider () {
    const { location } = this.props
    const defaultOpenKeys = []

    const menus = ROUTE_CONFIGS.map(item => {
      if (item.isSubMenu) defaultOpenKeys.push(item.key)
      return this.renderMenuItem(item)
    })

    return (
      <Sider
        theme='light'
        breakpoint='md'
        collapsedWidth='0'
        zeroWidthTriggerStyle={{ border: '1px solid #EFEFEF' }}
      >
        <Menu
          mode='inline'
          theme='light'
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[location.pathname]}
        >
          {menus}
        </Menu>
      </Sider>
    )
  }

  render () {
    return (
      <div className='dashboard'>
        <Layout>
          {this.renderHeader()}
          <Layout>
            {this.renderSider()}
            <Layout>
              {this.renderContent()}
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Dashboard