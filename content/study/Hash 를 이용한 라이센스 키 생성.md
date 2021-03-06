---
ads: true
comments: true
date: "2019-05-29T00:00:00Z"
disqus: true
image:
  feature: null
  teaser: teaser/study001.jpg
  thumb: null
modified: null
sitemap:
  changefreq: daily
  priority: 1
tags:
- hash
- license
- key
- 보안
title: Hash 를 이용한 라이센스 키 생성
---

# Hash 를 이용한 라이센스 키 생성
* Hash 를 통해 암호화 하고 이를 라이센스 키로 사용하는 방법 테스트
* MAC 주소를 불러와 hash 를 통해서 암호 키를 생성하고,
* 생성된 암호키를 어플리케이션 내해서 확인하여 라이센스 검증 테스트를 수행한다.

#### Digest 란?
암호화해시를 통해 얻은 메시지 (여기서는 라이센스 키로 사용)

#### MAC address 를 이용한 digest 생성


```python
import hashlib
import uuid

# get MAC address
myMacAdr = hex(uuid.getnode()) + "20190527"

# generate key using hash
myHash = hashlib.sha512(myMacAdr.encode('utf-8')).hexdigest()
testKey = open('test.key', 'w')
testKey.write(myHash)
testKey.close()

# test key for fail test
testAdr1 = hex(uuid.getnode()) + "20190528"
testHash1 = hashlib.sha512(testAdr1.encode('utf-8')).hexdigest()
testKey1 = open('test1.key', 'w')
testKey1.write(testHash1)
testKey1.close()

testAdr2 = hex(uuid.getnode() + 0x000012340000) + "20190527"
testHash2 = hashlib.sha512(testAdr2.encode('utf-8')).hexdigest()
testKey2 = open('test2.key', 'w')
testKey2.write(testHash1)
testKey2.close()
```

#### 생성된 결과물
* test.key # 올바른 라이센스 키
* test1.key # 위조된 라이센스 키
* test2.key # 위조된 라이센스 키

#### Key 값 을 이용한 어플리케이션의 라이센스 검증 테스트


```python
# test application for license key validation
class testApp():
    def __init__(self, key):
        print ("Initialize testApp using key: {}".format(key))
        # open key
        self.license = 'fail'
        testKey = open(key, 'r')
        
        # make true key
        # get MAC address
        myMacAdr = hex(uuid.getnode()) + "20190527"
        # generate key using hash
        myHash = hashlib.sha512(myMacAdr.encode('utf-8')).hexdigest()
        
        if testKey.readline() == myHash:
            self.license = 'pass'
            
    def runApp(self):
        if self.license == 'pass':
            print("Success certification")
        else:
            print("Fail certification!\n\n")
            return
            
        print (" ---------------")
        print (" run application")
        print (" ---------------\n\n")
```


```python
# run test
test = testApp('test.key')
test.runApp()
test1 = testApp('test1.key')
test1.runApp()
test2 = testApp('test2.key')
test2.runApp()
```

    Initialize testApp using key: test.key
    Success certification
     ---------------
     run application
     ---------------
    
    
    Initialize testApp using key: test1.key
    Fail certification!
    
    
    Initialize testApp using key: test2.key
    Fail certification!
    
    
    

위 결과에서 첫번째 라이센스 키는 올바로 동작하지만,
두번째, 세번째 결과에서는 라이센스 키 인증이 실패함을 알 수 있다.

#### 해쉬?
여기서 사용된 해쉬는 단방향 암호화 방법으로, 복호화가 불가능하다.
이를 이용해 라이센스 키를 생성하고 인증키를 확인하는데 사용하였다.
