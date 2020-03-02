
#ifndef __MYSTACK_CPP_
#define __MYSTACK_CPP_

#include <iostream>

template <typename T>
class MyStack {
private:
    T* data = nullptr;
    size_t cursor = 0;
    const size_t capacity = 0;

public:
    MyStack(size_t N) : capacity(N)
    {
        data = new T[N];
    }

    ~MyStack()
    {
        delete data;
    }

    bool isEmpty()
    {
        return cursor == 0;
    }

    bool isFull()
    {
        return cursor == capacity;
    }

    void push(T val)
    {
        if (isFull()) {
            throw "stack is full";
        }
        data[cursor++] = val;
    }

    void pop()
    {
        if (isEmpty()) {
            throw "stack is empty";
        }
        --cursor;
    }

    T top()
    {
        if (isEmpty()) {
            throw "stack is empty";
        }
        return data[cursor - 1];
    }
};

#endif