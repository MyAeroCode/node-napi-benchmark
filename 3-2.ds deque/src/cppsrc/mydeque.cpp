
#ifndef __MY_DEQUE__
#define __MY_DEQUE__

//
// below include statement is necessary for
// int32_t, int64_t, ...
#include <iostream>

template <typename T>
class MyDeque {
protected:
    T* data = nullptr;
    int64_t front = 0;
    int64_t rear = 0;
    int64_t capacity = 0;

    inline int64_t _cursor(int64_t cursor)
    {
        if (cursor < 0)
            cursor += capacity;
        if (cursor >= capacity)
            cursor -= capacity;
        return cursor;
    }

public:
    //
    // allocate array.
    MyDeque(size_t size)
    {
        this->capacity = size + 1;
        data = new T[this->capacity];
    }

    //
    // free array.
    ~MyDeque()
    {
        delete data;
    }

    //
    // test if deque is empty.
    bool isEmpty()
    {
        return front == rear;
    }

    //
    // test if deque is full.
    bool isFull()
    {
        return front == _cursor(rear + 1);
    }

    //
    // get count of saved element.
    size_t getSize()
    {
        size_t len = rear - front;
        if (len < 0)
            len += capacity;
        return len;
    }

    //
    // get front element.
    T peek_front()
    {
        if (isEmpty())
            throw "deque is empty";
        return data[_cursor(front + 1)];
    }

    //
    // get back element.
    T peek_back()
    {
        if (isEmpty())
            throw "deque is empty";
        return data[rear];
    }

    //
    // push element into front.
    void push_front(T val)
    {
        if (isFull())
            throw "deque is full";
        data[front] = val;
        front = _cursor(front - 1);
    }

    //
    // push element into back.
    void push_back(T val)
    {
        if (isFull())
            throw "deque is full";
        data[_cursor(rear + 1)] = val;
        rear = _cursor(rear + 1);
    }

    //
    // pop element of front.
    void pop_front()
    {
        if (isEmpty())
            throw "deque is empty";
        front = _cursor(front + 1);
    }

    //
    // pop element of back.
    void pop_back()
    {
        if (isEmpty())
            throw "deque is empty";
        rear = _cursor(rear - 1);
    }
};

#endif __MY_DEQUE__