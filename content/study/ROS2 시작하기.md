---
ads: true
date: "2020-02-04T00:00:00Z"
excerpt: null
image:
  feature: null
  teaser: teaser/study002.jpg
  thumb: null
modified: null
sitemap:
  changefreq: daily
  priority: 1
tags:
- ROS
- ROS2
- python
- c++
title: ROS2 시작하기
toc: true
toc_icon: cog
toc_label: Table of Contents
---

## [ROS2_Exercise](https://github.com/Kyungpyo-Kim/ROS2_Exercise)

## ROS2 INSTALLATION
https://index.ros.org/doc/ros2/Installation/#installationguide
https://index.ros.org/doc/ros2/Installation/Eloquent/Linux-Install-Debians/

* Version: ROS 2 Eloquent Elusor

* Takes ~10min

* Install the build tool Colcon
    https://colcon.readthedocs.io/en/released/user/installation.html
    ```
    sudo apt install python3-colcon-common-extensions
    ```


## Creating a ROS 2 package
https://index.ros.org/doc/ros2/Tutorials/Creating-A-ROS2-Package/

Goal: Create a new package using either CMake or Python, and run its executable.

Tutorial level: Beginner

Time: 15 minutes

* Create packages
    ```bash
    mkdir -p dev_ws/src && cd dev_ws/src
    ros2 pkg create --build-type ament_cmake --node-name dev_cpp_node dev_cpp_pkg
    ros2 pkg create --build-type ament_python --node-name dev_py_node dev_py_pkg
    cd .. && colcon build
    # colcon build --packages-select my_package
    . install/setup.bash
    ros2 run dev_cpp_pkg dev_cpp_node
    ros2 run dev_py_pkg dev_py_node
    ```

## TODO
* LifeCycle