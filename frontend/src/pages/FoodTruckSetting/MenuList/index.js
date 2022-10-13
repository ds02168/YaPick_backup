import React, { useState } from 'react';
import { useDetailFoodList } from '../../../hooks';
import { UpdateInput, TypeInfo, Avatar } from '../styles';
import { useSetting } from '../../../hooks/useSetting';

function FoodMenusList({ storeId, props }) {
  const [inputs, setInputs] = useState({
    menuName: '',
    menuPrice: '',
    menuContent: '',
  });
  const [menuImg, setMenuImg] = useState(false);
  const { menuName, menuPrice, menuContent } = inputs;
  const { patchMutateMenu, deleteMutateMenu } = useSetting();

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImg = reader.result;
      setMenuImg(resultImg);
    };
  };

  const formHandler = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <UpdateInput>
      <Avatar>
        <div>
          <img alt="새로운 메뉴 이미지" src={menuImg || props.image} />
          <label htmlFor={props.menuId}>수정</label>
          <input
            type="file"
            id={props.menuId}
            onChange={onChangeImg}
            accept="image/*"
          />
        </div>
      </Avatar>

      <TypeInfo onSubmit={formHandler}>
        <input
          placeholder={props.name}
          name="menuName"
          value={menuName}
          onChange={onChange}
        />

        <input
          placeholder={props.content}
          name="menuContent"
          value={menuContent}
          onChange={onChange}
        />

        <input
          placeholder={props.price}
          name="menuPrice"
          value={menuPrice}
          onChange={onChange}
        />
      </TypeInfo>

      <button
        type="button"
        onClick={() => {
          if (
            menuPrice &&
            menuContent &&
            menuName
            //  && menuImg
          ) {
            alert('음식 수정 완료');
            const e = props.menuId;
            const value = {
              name: menuName,
              price: menuPrice,
              content: menuContent,
              image: menuImg,
            };
            patchMutateMenu({ storeId, e, value });
          } else {
            alert('모든 정보를 입력해 주세요');
          }
        }}
      >
        수정
      </button>
      <button
        type="button"
        onClick={() => {
          alert('음식 제거 완료');
          const e = props.menuId;
          deleteMutateMenu({ storeId, e });
        }}
      >
        제거
      </button>
    </UpdateInput>
  );
}

function MenuList({ storeId }) {
  const { data } = useDetailFoodList(storeId);

  return (
    <>
      {data.data.menus.map((props) => (
        <FoodMenusList key={props.menuId} props={props} storeId={storeId} />
      ))}
    </>
  );
}

export default MenuList;
