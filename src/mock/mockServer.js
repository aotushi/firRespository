// 模拟mock数据接口的

import Mock from 'mockjs';
import banner from './banner.json';
import floor from './floor.json';

// 生成模拟数据接口
Mock.mock('/mock/banner', {code:200, data:banner});
Mock.mock('/mock/floor', {code:200, data:floor});
