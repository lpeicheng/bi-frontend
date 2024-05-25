import { UploadOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Form, message, Upload } from 'antd';
import React from 'react';
import {getLoginUserUsingGet, updateMyUserUsingPost} from "@/services/bi/userController";
import useStyles from "@/pages/User/settings/components/index.style";


const BaseView: React.FC = () => {
  const { styles } = useStyles();
  const [form] = Form.useForm();

  // 该函数会在上传前执行，会把file对象传过来，可以对上传的文件类型判断，限制大小等
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('图片不能超过1MB!');
    }
    return isJpgOrPng && isLt1M;
  };

  const handleChange = (info: any) => {
    // 当上传完毕
    if (info.file.status === 'done') {
      // 判断是否上传成功
      if (info.file.response.code === 200) {
        // 把返回的图像地址设置给 imageUrl
        getAvatarURL();
      }
    }
  };

  // 头像组件 方便以后独立，增加裁剪之类的功能
  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload name='file'
        showUploadList={false}
        action='/api/user/update/myAvatar'
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
  const { data: userData, loading } = useRequest(() => {
    return getLoginUserUsingGet();
  });
  const getAvatarURL = () => {
    if (userData) {
      if (userData.userAvatar) {
        return userData.userAvatar;
      }
    }
    return '';
  };
  const handleFinish = async () => {
    const updatedUserInfo: API.UserUpdateMyRequest = {
      userName: form.getFieldValue('userName'),
      userProfile: form.getFieldValue('userProfile'),
      userAvatar: form.getFieldValue('userAvatar'),
    };
    const updateUserInfo = await updateMyUserUsingPost(updatedUserInfo);
    if (updateUserInfo.data) {
      message.success('更新基本信息成功');
    } else {
      message.error(updateUserInfo.data);
    }
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...userData,
              }}
              hideRequiredMark
            >
              <ProFormText
                name="userName"
                label="用户名"
              />
              <ProFormTextArea
                name="userProfile"
                label="个人简介"
                placeholder="我是个人简介"
              />
              <ProFormText
                name="userAvatar"
                label="用户图像"
                placeholder="输入你的图片链接"
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};
export default BaseView;
