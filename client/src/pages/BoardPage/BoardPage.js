import React from 'react';
import SideBar from '../../components/SideBar/SideBar.js';
import PaginationCmp from '../../components/Pagination/PaginationCmp.js';
import SearchInput from '../../components/SearchInput/SearchInput.js'
import WriteButton from '../../components/WriteButton/WriteButton.js'

import Posts from './sections/Posts';
import './BoardPage.css';

function BoardPage() {
    return (
        <section className="boardPage">
            <div className="wrapper">
                <div className="boardPage_area">
                    <div className="sideBar_area">
                        <SideBar></SideBar>
                    </div>
                
                    <div className='posts_area'>
                        <div className="posts">
                            <div className="posts_header">
                                <div className="category_name">카테고리 이름</div>
                                <SearchInput></SearchInput>
                            </div>
                            <Posts postData={ postData }></Posts>
                        </div>
                        <WriteButton></WriteButton>
                        <PaginationCmp></PaginationCmp>    
                    </div>
                </div>
            </div>
        </section>
    );
};

const postData = [
    {
        "title":"가렌",
        "content":"가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다.가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다.가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서"
    },
    
    {
        "title":"니코",
        "content":"오랜 세월 잊힌 바스타야의 한 부족 출신인 니코는 다른 이의 모습을 빌려 어느 무리에든 뒤섞일 수 있으며, 심지어 상대의 감정을 흡수하여 적과 아군을 한눈에 구분할 수 있다. 그 누구도 니코가 어디 있는지, 정체가 무엇인지 확신할 수 없지만, 악의를 가지고 접근하는 자는 원초적 영혼 마법의 무시무시한 힘과 함께 그녀의 진정한 모습을 보게 될 것이다. "
    
    },
    
    
    {
        "title":"니달리",
        "content":"깊은 정글에서 자라난 니달리는 자신의 형태를 흉포한 쿠거로 자유자재로 변화시킬 수 있는 추적의 달인이다. "
    
    },

    {
        "title":"레오나",
        "content":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다."
    },
    
    {
        "title":"럭스",
        "content":"럭산나 크라운가드는 데마시아 인으로, 마법 능력을 가진 자를 공포와 의심을 담은 편협한 시선으로 보는 환경에서 태어났다. "
    
    },
    
    
    {
        "title":"세라핀",
        "content":"자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다.자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다."
    
    }

];



export default BoardPage;
