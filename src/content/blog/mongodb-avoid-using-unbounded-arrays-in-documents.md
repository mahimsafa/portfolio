---
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1674910150953/fd7a8ea6-b81d-4c0d-a8e2-ea67bcd335a8.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp
date: 2022-06-22
tags: ['mongodb', 'mongoose', 'database', 'database design']
title: 'MongoDB: Avoid using unbounded arrays in documents'
---

Hi everyone. Hope you are doing well. Today I will show you a scenario with the pros and cons that why you shouldn’t use unbound arrays in a MongoDB document. So without further ado let’s get started.

First, understand the scenario. Let’s assume we have a social media application where a user can follow multiple users and vice versa. So the initial MongoDB schema should look like this.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910133667/6eb2d597-f89c-4305-abe9-50327bd8cc0a.png)

Initial schema

Here we should pay attention to 2 fields **_followers_** and **_followings._** At the start of our application, we won’t have too much traffic as well as users. Let’s say we started with 10-20 k users. So at this scale, if a user follows another user it will store all data in that array of the schema. So documents stored in followers or followings array will have an average of 3 digits. In the worst-case scenario, it can go up to 4 digits. MongoDB can handle this much data for the time being. But the operation Can still be slow a little bit. This can be optimized. In this case, you can query for the **_followers_** in the following way.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910136092/9375a90d-61c9-4046-bc60-1f90f7332aec.png)

![Aggregation Framework](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910139097/991cd977-bd61-44b4-a763-165202c00ca9.png)

Get all followers for a user

**But** when the application grows in the number of users it can be hundreds of thousands of users even it can be millions of users. Then this initial user schema won’t work as expected on the other hand a single document in MongoDB can be max 16 MB. if a user can manage to get hundreds of thousands of followers the database will fail.

**So** to overcome this problem we can split the schema into two schemas. One is **_the User_** schema and another is **_Follow_** schema. These schemas should look like this.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910140784/5b48c0c0-5cdd-44ed-abb0-570200de6199.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910143361/d37295dd-ce98-4911-8b3b-964adfc7710d.png)

Optimized schema

Now, this schema is more optimized and scalable than the previous one. In this model, a user can follow or can have millions of followers without any issue which was previously impossible. Now in this case you can’t use the previously used query to fetch all followers of a user. Now to get all **_followers_** of a user you need a query something like this.

![Mongoose](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910146323/78c3704f-591b-44d5-ac11-70012896a39f.png)

![Aggregation Framework](https://cdn.hashnode.com/res/hashnode/image/upload/v1674910148650/9ea02021-8b57-440b-a31a-248dcfcc0af9.png)

Don’t be confused about why I am filtering with _the following_ field to get followers. just take a closer look on **_follow schema_** and give it a think you will understand easily.

That is all for today. Hope you find it useful. If you do please give it a clap and share it with your friends. If you like this kind of write-up consider following me. If you have any doubts you can always reach out to me.

Thank you for sticking this much.
