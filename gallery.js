const viewer=document.querySelector('#gallery-viewer');
let opener;
document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{
 opener=button;
 const image=button.querySelector('img');
 const target=viewer.querySelector('img');
 target.src=image.src;target.alt=image.alt;
 viewer.querySelector('#gallery-caption').textContent=button.dataset.caption+' · AI-generated concept, not an actual property photograph.';
 viewer.showModal();
}));
viewer.addEventListener('close',()=>opener?.focus());
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});
