<template>
  <IonList>
    <!-- Verifica se existem contatos -->
    <template v-if="contatos.length > 0">
      <IonItemSliding v-for="contato in contatos" :key="contato.id">
        <IonItem>
          <IonLabel>
            <h2>{{ contato.nome }}</h2>
            <p>{{ contato.email }}</p>
            <p>{{ contato.telefone }}</p>
          </IonLabel>
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption color="primary" @click="abrirEdicao(contato, $event)">Editar</IonItemOption>
          <IonItemOption color="danger" @click="confirmarExclusao(contato, $event)">Excluir</IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </template>

    <!-- Mensagem caso a lista esteja vazia -->
    <IonItem v-else>
      <IonLabel class="ion-text-center">Nenhum contato encontrado.</IonLabel>
    </IonItem>
  </IonList>

  <!-- Alerta de Edição -->
    <!-- Alerta de Edição Corrigido -->
  <IonAlert
    :is-open="editAlert.open"
    header="Editar Contato"
    :message="editAlert.error"
    :inputs="[
      { name: 'nome', type: 'text', placeholder: 'Nome', value: editAlert.data.nome },
      { name: 'email', type: 'text', placeholder: 'Email', value: editAlert.data.email },
      { name: 'telefone', type: 'tel', placeholder: 'Telefone', value: editAlert.data.telefone }
    ]"
    :buttons="[
      { text: 'Cancelar', role: 'cancel', handler: () => editAlert.open = false },
      { text: 'Salvar', handler: salvarEdicao }
    ]"
  />


  <!-- Alerta de Exclusão -->
  <IonAlert
    :is-open="deleteAlert.open"
    header="Excluir"
    message="Deseja excluir este contato?"
    :buttons="[
      { text: 'Não', role: 'cancel', handler: () => deleteAlert.open = false },
      { text: 'Sim', role: 'destructive', handler: excluir }
    ]"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { 
  IonList, IonItem, IonLabel, IonItemSliding, 
  IonItemOption, IonItemOptions, IonAlert 
} from '@ionic/vue';
import { listContatos, updateContato, deleteContatoById } from '@/services/database';

// Estado da lista e alertas
const contatos = ref<any[]>([]);
const editAlert = ref({ open: false, error: '', data: {} as any });
const deleteAlert = ref({ open: false, id: null as any });

// Função para carregar os dados
async function carregarDados() {
  try {
    const res = await listContatos();
    contatos.value = res || [];
  } catch (err) {
    console.error("Erro ao carregar contatos:", err);
  }
}

// Abre o alerta de edição e fecha o sliding
function abrirEdicao(contato: any, event: any) {
  event.target.closest('ion-item-sliding')?.close();
  editAlert.value = { open: true, error: '', data: { ...contato } };
}

// Salva a edição
async function salvarEdicao(values: any) {
  const id = editAlert.value.data.id;
  // Se o campo vier vazio no alerta, mantemos o que já estava no banco
  const nome = values.nome?.trim() || editAlert.value.data.nome;
  const email = values.email?.trim() || editAlert.value.data.email;
  const telefone = values.telefone || editAlert.value.data.telefone;

  if (!nome || !email) {
    editAlert.value.error = "Nome e Email são obrigatórios.";
    return false; // Não fecha o alerta
  }

  try {
    await updateContato(id, nome, email, telefone);
    editAlert.value.open = false;
    await carregarDados();
    return true;
  } catch (err) {
    console.error("Erro ao atualizar:", err);
    editAlert.value.error = "Erro ao salvar no banco.";
    return false;
  }
}

// Lógica de exclusão
function confirmarExclusao(contato: any, event: any) {
  event.target.closest('ion-item-sliding')?.close();
  deleteAlert.value = { open: true, id: contato.id };
}

async function excluir() {
  if (deleteAlert.value.id) {
    await deleteContatoById(deleteAlert.value.id);
    deleteAlert.value.open = false;
    carregarDados();
  }
}

// Ciclo de vida e eventos
onMounted(() => {
  carregarDados();
  window.addEventListener('contato-salvo', carregarDados);
});

onBeforeUnmount(() => {
  window.removeEventListener('contato-salvo', carregarDados);
});
</script>
