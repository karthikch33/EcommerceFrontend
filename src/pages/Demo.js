import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getMyOrders } from '../features/user/userSlice';
import { Table } from 'antd';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { render } from 'react-dom';

const MyOrders = () => {
  const dispatch = useDispatch()
  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    dispatch(getMyOrders())
    .then((response)=>{
      const fetchedOrders = response?.payload;
      console.log(fetchedOrders)
      const ordersData = []
      fetchedOrders?.forEach((order)=>{
        const singleOrderCartData = order?.orderItems;
        for(let i = 0; i < singleOrderCartData.length;i++){
          ordersData.push({
            price : singleOrderCartData[i]?.price,
            quantity : singleOrderCartData[i]?.quantity,
            orderStatus : order?.orderStatus,
            title : singleOrderCartData[i]?.product?.title,
            brand : singleOrderCartData[i]?.product?.brand,
            category : singleOrderCartData[i]?.product?.category,
            image : singleOrderCartData[i]?.product?.images[0]?.url,
            orderId : order?._id,
            orderDate : order?.createdAt,
            // shippingInfo : singleOrderCartData[i]?.shippingInfo,
            // paymentInfo : singleOrderCartData[i]?.paymentInfo,
            // paymentStatus : singleOrderCartData[i]?.paymentStatus,
            totalPrice : order?.totalPrice,
          })
        }
      })
      setOrders(ordersData)
    })
  },[])

  const columns = [
    {
      key : 'key',
      dataIndex : 'key',
      title : 'SNO'
    },
    {
      key : 'title',
      dataIndex : 'title',
      title : 'Product Name'
    },
    {
      key : 'brand',
      dataIndex : 'brand',
      title : 'Brand'
    },
    {
      key : 'category',
      dataIndex : 'category',
      title : 'Category'
    },
    {
      key : 'price',
      dataIndex : 'price',
      title : 'Price'
    },
    {
      key : 'quantity',
      dataIndex : 'quantity',
      title : 'Quantity'
    },
    {
      key : 'orderDate',
      dataIndex : 'orderDate',
      title : 'Order Date',
      render : (text)=>{
        return new Date(text).toLocaleDateString('en-IN',{
          day : '2-digit',
          month : '2-digit',
          year : 'numeric',
          // minute : '2-digit',
          // second : '2-digit',
          // hour : '2-digit',
        })
      }
    },
    {
      key : 'orderStatus',
      dataIndex : 'orderStatus',
      title : 'Order Status'
    },
    {
      key : 'totalPrice',
      dataIndex : 'totalPrice',
      title : 'Total Price',
      render : (price)=>{
        return `₹${price}.00`
      }

    },
    // {
    //   key : 'paymentStatus',
    //   dataIndex : 'paymentStatus',
    //   title : 'Payment Status'
    // },
    // {
    //   key : 'shippingInfo',
    //   dataIndex : 'shippingInfo',
    //   title : 'Shipping Info'
    // },
    // {
    //   key : 'paymentInfo',
    //   dataIndex : 'paymentInfo',
    //   title : 'Payment Info'
    // }
  ]
  const sortedOrders = Array.isArray(orders) ? [...orders].sort((a,b)=> new Date(b.orderDate) - new Date(a.orderDate)) : []

  const indexedOrders = sortedOrders.map((order,index)=>({
    ...order,
    key : index + 1
  }))
  
  return (
    <>
    <Meta title={"My Orders"} />
    <BreadCrumb title="My Orders" />
    <div className='px-5'>
    <Table 
    columns={columns} 
    dataSource={indexedOrders} 
    summary={(pageData) => {
      let total = 0;
      pageData.forEach(({ totalPrice }) => {
        total += totalPrice;
      });
      return (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={8}>Total</Table.Summary.Cell>
            <Table.Summary.Cell index={1} colSpan={1}>₹{total}.00</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      );
    }}
/>
    </div>
    </>
  )
}

export default MyOrders;