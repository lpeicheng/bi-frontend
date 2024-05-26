import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { Link, history } from '@umijs/max';
import { errorConfig } from './requestConfig';
import {getLoginUserUsingGet} from "@/services/bi/userController";
import {useEffect} from "react";
import {notification} from "antd";
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
let currentUser: API.LoginUserVO | undefined;

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.LoginUserVO;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await getLoginUserUsingGet();
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      currentUser,
    };
  }
  return {};
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // 初始化 WebSocket 连接
  useEffect(() => {
    if (currentUser) {
      const userId = currentUser?.id
      // const newSocket = new WebSocket('ws://localhost:8080/api/websocket/' + userId);
      const newSocket = new WebSocket('ws://47.109.191.16:8080/api/websocket/' + userId);
      newSocket.onopen = () => {
        console.log('WebSocket已连接');
      };
      newSocket.onmessage = (event) => {
        if (event.data === '图表生成好啦，快去看看吧！') {
          notification.success({
            message: event.data,
            duration: 2,
          });
          // 获取当前路径
          const currentPath = history.location.pathname;
          if (currentPath === '/mychart') {
            // 刷新当前路径
            window.location.reload();
          }
        } else {
          notification.error({
            message: event.data, // 根据实际情况设置错误消息
            duration: 2,
          });
        }
      };
      newSocket.onclose = (event) => {
        console.log('WebSocket已关闭：', event);
        // 可以根据需要重新连接或处理关闭
      };

      // 将新的 socket 设置到 initialState 中
      setInitialState((preInitialState) => ({
        ...preInitialState,
        socket: newSocket,
      }));

      // 当组件卸载时清理 WebSocket 连接
      return () => {
        if (
          newSocket.readyState === WebSocket.OPEN ||
          newSocket.readyState === WebSocket.CONNECTING
        ) {
          newSocket.close();
        }
      };
    }
  }, []);

  return {
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  baseURL: 'http://106.52.221.21:8101/',
  withCredentials:true,
  ...errorConfig,
};
